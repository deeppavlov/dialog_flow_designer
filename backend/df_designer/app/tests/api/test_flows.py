# create test flows function here
import pytest
from omegaconf import OmegaConf

from app.api.api_v1.endpoints.flows import flows_get, flows_post
from app.core.config import settings


@pytest.mark.asyncio
async def test_flows_get(mocker):
    read_conf = mocker.patch("app.api.api_v1.endpoints.flows.read_conf", return_value=OmegaConf.create({"foo": "bar"}))

    bot_repo = mocker.MagicMock()
    tag = mocker.MagicMock()
    tag.name = "43"
    bot_repo.tags = [tag]
    mocker.patch("app.api.api_v1.endpoints.flows.Repo.init", return_value=bot_repo)

    response = await flows_get("43")

    read_conf.assert_called_with(settings.frontend_flows_path)
    bot_repo.git.checkout.assert_called_once_with("43", settings.frontend_flows_path.name)
    assert response["status"] == "ok"
    assert response["data"] == {"foo": "bar"}


@pytest.mark.asyncio
async def test_flows_post(mocker):
    write_conf = mocker.patch("app.api.api_v1.endpoints.flows.write_conf")
    get_repo = mocker.patch("app.api.api_v1.endpoints.flows.get_repo")
    commit_changes = mocker.patch("app.api.api_v1.endpoints.flows.commit_changes")

    response = await flows_post({"foo": "bar"}, "save1")

    write_conf.assert_called_with({"foo": "bar"}, settings.frontend_flows_path)
    get_repo.assert_called_with(settings.frontend_flows_path.parent)
    repo = get_repo.return_value
    commit_changes.assert_called_with(repo, "Save frontend flows")
    repo.create_tag.assert_called_with("save1")
    assert response["status"] == "ok"
